import { InventoryInDetail } from "../types/types";

//this class acts as an interface for the actual services
abstract class DetailService{
    abstract getList(): Promise<InventoryInDetail[]>;
    abstract deleteItem(id: number): Promise<void>
    abstract addItem(item: any): Promise<void>
    abstract updateItem(id: number, item: any): Promise<void>
}

class ServerDetailService extends DetailService{
    async getList() : Promise<InventoryInDetail[]> {
        let resp = await fetch('http://localhost:5230/api/inventory');
        
        if (!resp.ok){
            throw new Error('Error from server, Please try again');
        };

        let body = await resp.json();

        //convert the date field to actual dates BECAUSE STUPID JSON DOES NOT HAVE A DATE DATATYPE!!!!
        for (let i of body){
            i.inventoryInHeader.docDate = new Date(i.inventoryInHeader.docDate);
            i.expireDate = new Date(i.expireDate);
        }
        
        return body;
    }

    async deleteItem(id: number): Promise<void>{
        let resp = await fetch('http://localhost:5230/api/inventory/' + id, {method: 'DELETE'});
        
        if (!resp.ok){
            throw new Error('Error from server, Please try again');
        };
    }

    async addItem(item: any): Promise<any> {
        let resp = await fetch('http://localhost:5230/api/inventory', {
            method: 'POST', 
            body: JSON.stringify(item),
            headers: new Headers({'Content-Type':'application/json'})
        });
        
        if (!resp.ok){
            throw new Error('Error from server, Please try again');
        };
    }

    async updateItem(id: number, item: any): Promise<void> {
        let resp = await fetch('http://localhost:5230/api/inventory/' + id, {
            method: 'PUT', 
            body: JSON.stringify(item),
            headers: new Headers({'Content-Type':'application/json'})
        });
        
        if (!resp.ok){
            throw new Error('Error from server, Please try again');
        };        
    }
}


class StaticDetailService extends DetailService{
    list: InventoryInDetail[] = new Array(10);
    
    constructor(){
        super();
        for (let i = 0; i < 10; i++)(
            this.list[i] = {
                inventoryInDetailId: i,
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
    
    async getList() : Promise<InventoryInDetail[]> {
        return this.list;
    }

    async deleteItem(id: number): Promise<any>{
        this.list = this.list.filter(x => x.inventoryInDetailId !== id);
    }

    //too lazy to implement the static add function
    async addItem(item: any): Promise<any> {
        let newId: number = Math.max.apply(null,this.list.map(x => x.inventoryInDetailId)) + 1; //gets the largest id in the list and adds 1 to it
        
        // this.list.push({
        //     inventoryInDetailId: newId,
        //     inventoryInHeader: {
        //         inventoryInHeaderId: item.inventoryInHeaderId,
        //         branch: {
        //             branchId: 1222,
                    
        //         }
        //     }
        // })

    }

    async updateItem(id: number, item: any): Promise<void> {
        //ignore this function
    }
}

export {DetailService, ServerDetailService, StaticDetailService};