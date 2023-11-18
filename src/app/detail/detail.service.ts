import { InventoryInDetail } from "../types/types";

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

class StaticDetailService{
    async getList() : Promise<InventoryInDetail[]> {

        return Array(10).fill(
            {
                inventoryInDetailId: 1,
                inventoryInHeader: {
                    inventoryInHeaderId: 1,
                    branch: {
                        branchId: 0,
                        name: "I give up"
                    },
                    docDate: new Date('2002-02-26'),
                    reference: "Some Reference",
                    totalValue: 0,
                    remarks: ""
                },
                serial: 1337,
                item: {
                    itemId: 1,
                    name: "Item Name"
                },
                package: {
                    packageId: 2,
                    name: "Package Name"
                },
                batchNumber: '232323',
                serialNumber: '223232',
                expireDate: new Date('2030-01-01'),
                quantity: 10,
                consumerPrice: 10,
                totalValue: 100
            }
        );
    }
}

export {StaticDetailService, InventoryInDetail};