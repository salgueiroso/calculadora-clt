export class Faixa {
    aliquota: number;
    valorMaximo: number;
    valorBaseFaixa: number | null = null;
    impostoFaixa: number | null = null;

    constructor(aliquota: number, valorMaximo: number) {
        this.aliquota = aliquota;
        this.valorMaximo = valorMaximo;
    }
}
