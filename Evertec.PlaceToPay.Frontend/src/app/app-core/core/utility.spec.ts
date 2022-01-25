import { Utility } from './utility';

describe('Utility', () => {
  beforeEach(() => {});

  it('Utility => copyObj Object', () => {
    // Arrange
    const objInit = { nomber: 'Prueba' };

    // Act
    const objCopy = Utility.copyObj(objInit);

    // Assert
    expect(objCopy).toBeDefined();
    expect(objInit).toEqual(objCopy);
  });

  it('Utility => compare Objects', () => {
    // Arrange
    const objInit = { nomber: 'Prueba' };

    // Act
    const objCopy = Utility.copyObj(objInit);

    // Assert
    expect(objCopy).toBeDefined();
    expect(Utility.compareObjects(objInit, objCopy)).toBe(true);
  });

  it('Utility => compare Objects false', () => {
    // Arrange
    const objInit = { nomber: 'Prueba' };

    // Act
    const objCopy = Utility.copyObj({ nomber: 'Prueba36' });

    // Assert
    expect(objCopy).toBeDefined();
    expect(Utility.compareObjects(objInit, objCopy)).toBe(false);
  });

  it('Utility => first Upper Case', () => {
    // Arrange
    const objInit = { nomber: 'prueba' };

    // Act
    const objCopy = Utility.firstUpperCase(objInit.nomber);

    // Assert
    expect(objCopy).toBeDefined();
    expect(objCopy).toBe('Prueba');
  });

  it('Utility => Null first Upper Case', () => {
    // Assert
    expect(Utility.firstUpperCase(null)).toBe(null);
  });

  it('Utility => Null objectHasValue', () => {
    // Assert
    expect(Utility.objectHasValue(null)).toBe(false);
  });

  it('Utility => false objectHasValue', () => {
    // Assert
    expect(Utility.objectHasValue({})).toBe(false);
  });

  it('Utility => false null objectHasValue', () => {
    // Assert
    expect(Utility.objectHasValue({nombre: '', otro: undefined})).toBe(false);
  });

  it('Utility => true objectHasValue', () => {
    // Assert
    expect(Utility.objectHasValue({ nombre: 'prueba' })).toBe(true);
  });

  it('Utility => false value objectHasValue', () => {
    // Assert
    expect(Utility.objectHasValue({ nombre: '', otro: 'prueba' })).toBe(true);
  });

  it('Utility => false value null objectHasValue', () => {
    // Assert
    expect(Utility.objectHasValue({ nombre: null, otro: 'prueba' })).toBe(true);
  });

  it('Utility => false value undefined objectHasValue', () => {
    // Assert
    expect(Utility.objectHasValue({ nombre: undefined, otro: 'prueba' })).toBe(true);
  });

  it('Utility => format string', () => {
    // Assert
    expect(Utility.format('preuba {0}', ['uno'])).toBe('preuba uno');
  });
});
