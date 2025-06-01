import { Faixas } from ".";

export class Faixa {
    aliquota: number;
    valorMaximo: number;
    valorBaseFaixa: number | null = null;
    impostoFaixa: number | null = null;

    constructor(aliquota: number, valorMaximo: number) {
        this.aliquota = aliquota > 1 ? aliquota / 100 : aliquota;
        this.valorMaximo = valorMaximo;
    }
}

export interface IOptions {
    incluir13Salario: boolean;
    incluirFerias: boolean;
    faixasInss: Faixas | null;
    faixasIrpf: Faixas | null;
}