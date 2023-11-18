type Branch = {
    branchId: number,
    name: string
}

type Package = {
    packageId: number,
    name: string
}

type Item = {
    itemId: number,
    name: string
}

type InventoryInHeader = {
    inventoryInHeaderId: number,
    branch: Branch,
    docDate: Date,
    reference: string,
    totalValue: number,
    remarks: string
}

type InventoryInDetail = {
    inventoryInDetailId: number,
    inventoryInHeader: InventoryInHeader,
    serial: number,
    item: Item,
    package: Package,
    batchNumber: string,
    serialNumber: string,
    expireDate: Date,
    quantity: number,
    consumerPrice: number,
    totalValue: number
}

export {Branch, Package, Item, InventoryInDetail, InventoryInHeader}