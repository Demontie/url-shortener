import type { ErrorOptions } from './base.error';
import { ValidationError } from './custom.errors';

// Address errors
export class StreetRequiredError extends ValidationError {
  constructor(options: ErrorOptions = {}) {
    super('Street is required', {
      code: 'ADDRESS_STREET_REQUIRED',
      details: { field: 'street' },
      ...options,
    });
  }
}

export class NumberRequiredError extends ValidationError {
  constructor(options: ErrorOptions = {}) {
    super('Number is required', {
      code: 'ADDRESS_NUMBER_REQUIRED',
      details: { field: 'number' },
      ...options,
    });
  }
}

export class NeighborhoodRequiredError extends ValidationError {
  constructor(options: ErrorOptions = {}) {
    super('Neighborhood is required', {
      code: 'ADDRESS_NEIGHBORHOOD_REQUIRED',
      details: { field: 'neighborhood' },
      ...options,
    });
  }
}

export class CityRequiredError extends ValidationError {
  constructor(options: ErrorOptions = {}) {
    super('City is required', {
      code: 'ADDRESS_CITY_REQUIRED',
      details: { field: 'city' },
      ...options,
    });
  }
}

export class StateRequiredError extends ValidationError {
  constructor(options: ErrorOptions = {}) {
    super('State is required', {
      code: 'ADDRESS_STATE_REQUIRED',
      details: { field: 'state' },
      ...options,
    });
  }
}

export class ZipCodeRequiredError extends ValidationError {
  constructor(options: ErrorOptions = {}) {
    super('Zip code is required', {
      code: 'ADDRESS_ZIP_CODE_REQUIRED',
      details: { field: 'zipCode' },
      ...options,
    });
  }
}

// Email errors
export class EmailInvalidError extends ValidationError {
  constructor(options: ErrorOptions = {}) {
    super('Invalid email format', {
      code: 'EMAIL_INVALID',
      details: { field: 'email' },
      ...options,
    });
  }
}

// Geolocation errors
export class LatitudeInvalidError extends ValidationError {
  constructor(options: ErrorOptions = {}) {
    super('Invalid latitude value', {
      code: 'GEO_LATITUDE_INVALID',
      details: { field: 'latitude' },
      ...options,
    });
  }
}

export class LongitudeInvalidError extends ValidationError {
  constructor(options: ErrorOptions = {}) {
    super('Invalid longitude value', {
      code: 'GEO_LONGITUDE_INVALID',
      details: { field: 'longitude' },
      ...options,
    });
  }
}

// Person errors
export class PersonTypeInvalidError extends ValidationError {
  constructor(options: ErrorOptions = {}) {
    super('Invalid person type', {
      code: 'PERSON_TYPE_INVALID',
      details: { field: 'type' },
      ...options,
    });
  }
}

export class CPFInvalidError extends ValidationError {
  constructor(options: ErrorOptions = {}) {
    super('Invalid CPF', {
      code: 'CPF_INVALID',
      details: { field: 'document', type: 'CPF' },
      ...options,
    });
  }
}

export class CNPJInvalidError extends ValidationError {
  constructor(options: ErrorOptions = {}) {
    super('Invalid CNPJ', {
      code: 'CNPJ_INVALID',
      details: { field: 'document', type: 'CNPJ' },
      ...options,
    });
  }
}
