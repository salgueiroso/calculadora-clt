import { LinkedList } from '../src';

describe('CLT', () => {
    test('Inicializar', () => {
        const lista = new LinkedList<any>();
        expect(lista).not.toBeNull()
    });

    test('insertAtEnd', () => {
        const lista = new LinkedList<Number>([1, 9]);
        const no = lista.insertAtEnd(7);
        expect(no.data).toEqual(7);
    });

    test('insertAtEnd - check inserteds', () => {
        const lista = new LinkedList<Number>([1, 9]);
        const no = lista.insertAtEnd(7);
        expect(no.data).toEqual(7);
        expect(no.prev?.data).toEqual(9);
        expect(no.prev?.prev?.data).toEqual(1);
    });

    test('insertInBegin', () => {
        const lista = new LinkedList<Number>();
        const no = lista.insertInBegin(7);
        expect(no.data).toEqual(7);
    });

    test('insertInBegin - check inserteds', () => {
        const lista = new LinkedList<Number>([1, 9]);
        const no = lista.insertInBegin(7);
        expect(no.prev?.data).not.toBeTruthy()
        expect(no.data).toEqual(7);
        expect(no.next?.data).toEqual(1);
        expect(no.next?.next?.data).toEqual(9);
        expect(no.next?.next?.next?.data).not.toBeTruthy();
    });

    test('deleteNode - check ddeleteds', () => {
        const lista = new LinkedList<Number>();


        expect(lista.search(v => v === 1)).toBeNull();

        const no1 = lista.insertAtEnd(1);
        const no2 = lista.insertAtEnd(2);
        const no3 = lista.insertAtEnd(3);
        const no4 = lista.insertAtEnd(4);

        expect(lista.search(v => v === no1.data)).not.toBeNull();
        lista.deleteNode(no1);
        expect(lista.search(v => v === no1.data)).toBeNull();

        expect(lista.search(v => v === no2.data)).not.toBeNull();
        expect(lista.search(v => v === no3.data)).not.toBeNull();
        expect(lista.search(v => v === no4.data)).not.toBeNull();



        expect(lista.search(v => v === no3.data)).not.toBeNull();
        lista.deleteNode(no3);
        expect(lista.search(v => v === no3.data)).toBeNull();

        expect(lista.search(v => v === no2.data)).not.toBeNull();
        expect(lista.search(v => v === no4.data)).not.toBeNull();
    });



    test('traverse - convert to empty array like and check', () => {
        const lista = new LinkedList<Number>();

        const arr = lista.traverse();

        expect(arr).toBeTruthy()
        expect(arr).toHaveLength(0);
    });



    test('traverse - convert to array like and check', () => {
        const lista = new LinkedList<Number>();
        const no1 = lista.insertInBegin(1);
        const no2 = lista.insertInBegin(2);
        const no3 = lista.insertInBegin(3);

        const arr = lista.traverse();

        expect(arr).toBeTruthy();
        expect(arr).toHaveLength(3);
        expect(arr).toContainEqual(1)
        expect(arr).toContainEqual(2);
        expect(arr).toContainEqual(3);
    });



    test('traverse - convert to array like and check', () => {
        const lista = new LinkedList<Number>([8, 9, 10]);
        const no1 = lista.insertInBegin(1);
        const no2 = lista.insertInBegin(2);
        const no3 = lista.insertInBegin(3);

        expect(lista.size()).toEqual(6);
    });

    test('Iterator - check is has items for interator', () => {
        const lista = new LinkedList<Number>([8, 9, 10]);
        const no1 = lista.insertInBegin(1);
        const no2 = lista.insertInBegin(2);
        const no3 = lista.insertInBegin(3);

        expect(lista).toContainEqual(no1);
        expect(lista).toContainEqual(no2);
        expect(lista).toContainEqual(no3);
    });

    test('clear - Check clearing list', () => {
        const lista = new LinkedList<Number>([8, 9, 10]);
        const no1 = lista.insertInBegin(1);
        const no2 = lista.insertInBegin(2);
        const no3 = lista.insertInBegin(3);

        expect(lista.size()).toEqual(6);

        lista.clear();

        expect(lista.size()).toEqual(0);
    });
});