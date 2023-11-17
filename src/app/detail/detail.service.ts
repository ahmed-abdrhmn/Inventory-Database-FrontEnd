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

class DetailService{
    async getList() : Promise<InventoryInDetail[]> {
        let resp = await fetch('http://localhost:5230/api/inventory');
        if (!(resp.status === 200)){
            return []
        }

        let body = await resp.json();
        
        return body;
    }
}

export {DetailService, Branch, Package, Item, InventoryInHeader, InventoryInDetail};