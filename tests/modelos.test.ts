import { Faixa } from '../src';

describe('Faixa', () => {
    test('Inicializar', () => {
        const faixa = new Faixa(0, 0);
        expect(faixa).not.toBeNull();
    });

    test('aliquota', () => {
        const faixa = new Faixa(10, 0);
        expect(faixa.aliquota).toEqual(10);
    });

    test('valorMaximo', () => {
        const faixa = new Faixa(0, 1000);
        expect(faixa.valorMaximo).toEqual(1000);
    });

});