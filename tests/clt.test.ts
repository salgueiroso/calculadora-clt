import { Clt, Faixa, Faixas } from '../src';

describe('CLT', () => {
    test('Inicializar', () => {
        const clt = new Clt(1412);
        expect(clt).not.toBeNull();
        expect(clt.salarioBruto).toEqual(1412);
    });

    test('vlSalarioLiquido - 11960', () => {
        const clt = new Clt(11960);
        expect(clt.vlSalarioLiquido).toEqual(8908.076695);
    });

    test('vlImpostoInss - 11960', () => {
        const clt = new Clt(11960);
        expect(clt.vlImpostoInss).toEqual(908.8618000000001);
    });

    test('vlImpostoIrpf - 11960', () => {
        const clt = new Clt(11960);
        expect(clt.vlImpostoIrpf).toEqual(2143.061505);
    });

    test('faixasInss.size', () => {
        const clt = new Clt(11960);
        expect(clt.faixasInss.size()).toEqual(4);
    });

    test('faixasIrpf.size', () => {
        const clt = new Clt(11960);
        expect(clt.faixasIrpf.size()).toEqual(5);
    });

    test('calcularImpostosFaixas', () => {
        const clt = new Clt(11960);
        const imposto = clt.calcularImpostosFaixas(clt.salarioBruto, new Faixas([new Faixa(0, clt.salarioBruto)]));
        expect(imposto).toEqual(0);
    });

    it.each([
        true, false, true, false
    ])('calcularInss', (forceRecalc) => {
        const clt = new Clt(11960);
        const imposto1 = clt.calcularInss(forceRecalc)
        expect(imposto1).toEqual(908.8618000000001);
        const imposto2 = clt.calcularInss(forceRecalc)
        expect(imposto2).toEqual(908.8618000000001);
    });

    it.each([
        true, false, true, false
    ])('calcularIrpf', (forceRecalc) => {
        const clt = new Clt(11960);
        const imposto1 = clt.calcularIrpf(forceRecalc)
        expect(imposto1).toEqual(2143.061505);
        const imposto2 = clt.calcularIrpf(forceRecalc)
        expect(imposto2).toEqual(2143.061505);
    });

});