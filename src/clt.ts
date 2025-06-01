import { BaseLinkedList } from "./linkedlist";
import { Faixa } from ".";

import faixasInssJson from './data/faixasInss.json';
import faixasIrpfJson from './data/faixasIrpf.json';
import { IOptions } from "./modelos";


export class Faixas extends BaseLinkedList<Faixa> {
    validate(): void {

        for (let no of this) {
            if (no.prev) {
                if (no.data.aliquota <= no.prev.data.aliquota) {
                    throw new Error(`A aliquota da faixa atual (${no.data.aliquota}) deve ser superior à da faixa anterior (${no.prev.data.aliquota}).`);
                }
                if (no.data.valorMaximo <= no.prev.data.valorMaximo) {
                    throw new Error(`O valor máximo da faixa atual (${no.data.valorMaximo}) deve ser superior ao da faixa anterior (${no.prev.data.valorMaximo}).`);
                }
            }
        }
    }
}

export class Clt {

    private _faixasInss: Faixas;
    private _faixasIrpf: Faixas;

    public readonly salarioBruto: number;
    public readonly incluir13Salario: boolean;
    public readonly incluirFerias: boolean;

    private _vlImpostoInss: number = 0;
    private _vlImpostoIrpf: number = 0;

    constructor(salarioBruto: number, opcoes: IOptions | null = null) {
        this.salarioBruto = salarioBruto;
        this.incluir13Salario = opcoes?.incluir13Salario ?? true;
        this.incluirFerias = opcoes?.incluirFerias ?? true;
        this._faixasInss = opcoes?.faixasInss ?? new Faixas(faixasInssJson.map(f => new Faixa(f.aliquota, +f.valorMaximo)));
        this._faixasIrpf = opcoes?.faixasIrpf ?? new Faixas(faixasIrpfJson.map(f => new Faixa(f.aliquota, +f.valorMaximo)));
    }

    public get vlImpostoInss(): number { return this.calcularInss(); }
    public get vlImpostoIrpf(): number { return this.calcularIrpf(); }
    public get aliquotaEfetivaInss(): number { return this.vlImpostoInss / this.salarioBruto; }
    public get aliquotaEfetivaIrpf(): number { return this.vlImpostoIrpf / this.salarioBruto; }
    public get aliquotaEfetivaTotal(): number { return (this.vlImpostoInss + this.vlImpostoIrpf) / this.salarioBruto; }
    public get vlDescontos(): number { return this.vlImpostoInss + this.vlImpostoIrpf; }
    public get faixasInss(): Faixas { return this._faixasInss; }
    public get faixasIrpf(): Faixas { return this._faixasIrpf; }
    public get baseCalculoInss(): number { return this.salarioBruto }
    public get baseCalculoIrpf(): number { return this.salarioBruto - this.calcularInss() }
    public get vlSalarioLiquido(): number {
        return this.salarioBruto - this.calcularInss() - this.calcularIrpf()
    }

    private normalizarVlMaxFaixa(vlMax: number, vl?: number | null): number {
        if (!vl) {
            return 0;
        } else if (vl === Infinity) {
            return vlMax;
        } else {
            return vl;
        }
    }

    calcularImpostosFaixas(vlBase: number, faixas: Faixas): number {
        for (let no of faixas) {
            const vlInicioFaixa = this.normalizarVlMaxFaixa(vlBase, no.prev?.data.valorMaximo);
            no.data.valorBaseFaixa = this.normalizarVlMaxFaixa(vlBase, no.data.valorMaximo) - vlInicioFaixa;
            no.data.impostoFaixa = no.data.valorBaseFaixa * no.data.aliquota;
        }

        const vlImposto = faixas
            .traverse()
            .map(v => v.impostoFaixa!)
            .reduce((a, b) => a + b);

        return vlImposto;
    }

    public calcularInss(forceRecalc: boolean = false): number {
        return forceRecalc || !this._vlImpostoInss
            ? this._vlImpostoInss = this.calcularImpostosFaixas(this.baseCalculoInss, this._faixasInss)
            : this._vlImpostoInss;
    }

    public calcularIrpf(forceRecalc: boolean = false): number {
        return forceRecalc || !this._vlImpostoIrpf
            ? this._vlImpostoIrpf = this.calcularImpostosFaixas(this.baseCalculoIrpf, this._faixasIrpf)
            : this._vlImpostoIrpf;
    }
}
