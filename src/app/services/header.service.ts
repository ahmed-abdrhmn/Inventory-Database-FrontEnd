import { InventoryInHeader } from "../types/types";

abstract class HeaderService {
    abstract getList(): Promise<InventoryInHeader[]>
}

class ServerHeaderService extends HeaderService{
    async getList() : Promise<InventoryInHeader[]> {
        let resp = await fetch('http://localhost:5230/api/header');
        if (!(resp.status === 200)){
            return []
        }

        let body = await resp.json();
        
        return body;
    }
}


class StaticHeaderService extends HeaderService{
    async getList() : Promise<InventoryInHeader[]> {

        return Array(10).fill(
            {
                inventoryInHeaderId: 1,
                branch: {
                    branchId: 0,
                    name: "I give up"
                },
                docDate: new Date('2002-02-26'),
                reference: "Some Reference",
                totalValue: 0,
                remarks: ""
            }
        );
    }
}

export {StaticHeaderService, HeaderService, ServerHeaderService};