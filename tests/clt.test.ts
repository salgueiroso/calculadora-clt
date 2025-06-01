import { Clt, Faixa, Faixas } from '../src';

describe('CLT', () => {

    let salarioBase: number = 12530.49;

    test('Inicializar', () => {
        const clt = new Clt(salarioBase);
        expect(clt).not.toBeNull();
        expect(clt.salarioBruto).toEqual(salarioBase);
    });

    test(`vlSalarioLiquido - ${salarioBase}`, () => {
        const clt = new Clt(salarioBase);
        expect(clt.vlSalarioLiquido).toEqual(9321.681945);
    });

    test(`vlImpostoInss - ${salarioBase}`, () => {
        const clt = new Clt(salarioBase);
        expect(clt.vlImpostoInss).toEqual(908.8618000000001);
    });

    test(`vlImpostoIrpf - ${salarioBase}`, () => {
        const clt = new Clt(salarioBase);
        expect(clt.vlImpostoIrpf).toEqual(2299.946255);
    });

    test('faixasInss.size', () => {
        const clt = new Clt(salarioBase);
        expect(clt.faixasInss.size()).toEqual(4);
    });

    test('faixasIrpf.size', () => {
        const clt = new Clt(salarioBase);
        expect(clt.faixasIrpf.size()).toEqual(5);
    });

    test('calcularImpostosFaixas', () => {
        const clt = new Clt(salarioBase);
        const imposto = clt.calcularImpostosFaixas(clt.salarioBruto, new Faixas([new Faixa(0, clt.salarioBruto)]));
        expect(imposto).toEqual(0);
    });

    it.each([
        true, false
    ])('calcularInss - forceRecalc=%s', (forceRecalc) => {
        const clt = new Clt(salarioBase);
        const imposto1 = clt.calcularInss(forceRecalc)
        expect(imposto1).toEqual(908.8618000000001);
        const imposto2 = clt.calcularInss(forceRecalc)
        expect(imposto2).toEqual(908.8618000000001);
    });

    it.each([
        true, false
    ])('calcularIrpf - forceRecalc=%s', (forceRecalc) => {
        const clt = new Clt(salarioBase);
        const imposto1 = clt.calcularIrpf(forceRecalc)
        expect(imposto1).toEqual(2299.946255);
        const imposto2 = clt.calcularIrpf(forceRecalc)
        expect(imposto2).toEqual(2299.946255);
    });


    test.each<Faixa[]>([
        [new Faixa(0.9, 9000), new Faixa(0.2, 2000), new Faixa(0.3, 3000), new Faixa(0.4, 4000)],
        [new Faixa(0.2, 2000), new Faixa(0.3, 3000), new Faixa(0.1, 1000)],

    ])("erro se a faixa estiver em ordem incorreta - %s", (...faixas) => {
        expect(() => {
            new Faixas(faixas);
        }).toThrow(/A aliquota da faixa atual \(0\.\d\) deve ser superior à da faixa anterior \(0\.\d\)\./);
    });

});