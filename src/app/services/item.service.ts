import { Item } from "../types/types";

abstract class ItemService {
    abstract getList(): Promise<Item[]>;
    abstract deleteItem(id: number): Promise<void>
    abstract addItem(item: any): Promise<void>
    abstract updateItem(id: number, item: any): Promise<void>
}

class ServerItemService extends ItemService{
    async getList() : Promise<Item[]> {
        let resp = await fetch('http://localhost:5230/api/item');
        
        if (!resp.ok){
            throw new Error('Error from server, Please try again');
        };

        let body = await resp.json();
        
        return body;
    }

    async deleteItem(id: number): Promise<void>{
        let resp = await fetch('http://localhost:5230/api/item/' + id, {method: 'DELETE'});
        
        if (!resp.ok){
            throw new Error('Error from server, Please try again');
        };
    }

    async addItem(item: any): Promise<void> {
        let resp = await fetch('http://localhost:5230/api/item', {
            method: 'POST', 
            body: JSON.stringify(item),
            headers: new Headers({'Content-Type':'application/json'})
        });
        
        if (!resp.ok){
            throw new Error('Error from server, Please try again');
        };
    }

    async updateItem(id: number, item: any): Promise<void> {
        let resp = await fetch('http://localhost:5230/api/item/' + id, {
            method: 'PUT', 
            body: JSON.stringify(item),
            headers: new Headers({'Content-Type':'application/json'})
        });
        
        if (!resp.ok){
            throw new Error('Error from server, Please try again');
        };        
    }
}



// class StaticHeaderService extends HeaderService{
//     async getList() : Promise<InventoryInHeader[]> {

//         return Array(10).fill(
//             {
//                 inventoryInHeaderId: 1,
//                 branch: {
//                     branchId: 0,
//                     name: "I give up"
//                 },
//                 docDate: new Date('2002-02-26'),
//                 reference: "Some Reference",
//                 totalValue: 0,
//                 remarks: ""
//             }
//         );
//     }
// }

export {ItemService, ServerItemService};