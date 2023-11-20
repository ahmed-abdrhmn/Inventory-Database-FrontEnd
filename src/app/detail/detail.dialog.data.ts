export type DetailDialogData = {
    lists: {
      headerIds: number[]
      packageIds: number[]
      itemIds: number[]
    }
    form?: { //this will only be filled in an add form
      inventoryInHeaderId: number | null
      serial: number | null,
      itemId: number | null,
      packageId: number | null,
      batchNumber: string | null,
      serialNumber: string | null,
      expireDate: Date | null,
      quantity: number | null,
      consumerPrice: number | null
    }
  }