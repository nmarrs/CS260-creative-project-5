export let getTestData = () => {
  return {
    car1: {
      VIN: '5FNYF3H52DB030806',
      make: 'Tesla',
      model: 'Roadster',
      color: 'Red',
      purchaseDate: '09/15/18',
      purchasePrice: 250000.00,
      originalPrice: 250000.00,
      owner: 'Nathan Marrs',
      previousOwners: [],
      mileage: 2000,
      maintenanceHistory: [
        {
          type: 'Wiper Fluid Replacement',
          date: '09/10/18',
          vendor: 'Oil Rig'
        },
        {
          type: 'Tire Alignment',
          date: '09/09/18',
          vendor: 'Clegg Auto'
        }
      ]
    },
    car2: {
      VIN: '1HTLKUGR4EHA92618',
      make: 'Tesla',
      model: 'Model S P100D',
      color: 'Silver',
      purchaseDate: '09/15/14',
      purchasePrice: 50000.00,
      originalPrice: 80000.00,
      owner: 'Nolan Maddy',
      previousOwners: ['Michael Shim'],
      mileage: 80000,
      maintenanceHistory: [
        {
          type: 'Wiper Fluid Replacement',
          date: '07/18/15',
          vendor: 'Wiper Emporium'
        },
        {
          type: 'Tire Replacement',
          date: '02/10/17',
          vendor: 'Tires on Fires'
        },
        {
          type: 'Wiper Fluid Replacement',
          date: '10/10/17',
          vendor: 'Oil Rig'
        },
        {
          type: 'Tire Alignment',
          date: '05/09/18',
          vendor: 'Clegg Auto'
        }
      ]
    }
  }
}
