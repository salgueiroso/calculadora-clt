import { LinkedList } from "./linkedlist";
import { Faixa } from "./modelos";

import faixasInss from './data/faixasInss.json';
import faixasIrpf from './data/faixasIrpf.json';



export class Faixas extends LinkedList<Faixa> { }

export class Clt {

    private _faixasInss: Faixas;
    private _faixasIrpf: Faixas;

    public readonly salarioBruto: number;

    private _vlImpostoInss: number = 0;
    private _vlImpostoIrpf: number = 0;

    constructor(salarioBruto: number) {
        this.salarioBruto = salarioBruto;
        this._faixasInss = new Faixas(faixasInss.map(f => new Faixa(f.aliquota, +f.valorMaximo)));
        this._faixasIrpf = new Faixas(faixasIrpf.map(f => new Faixa(f.aliquota, +f.valorMaximo)));
    }

    public get vlImpostoInss(): number { return this.calcularInss(); }
    public get vlImpostoIrpf(): number { return this.calcularIrpf(); }
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
