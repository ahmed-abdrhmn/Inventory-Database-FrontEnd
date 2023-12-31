import { InventoryInHeader } from "../types/types";

abstract class HeaderService {
    abstract getList(): Promise<InventoryInHeader[]>;
    abstract deleteItem(id: number): Promise<void>
    abstract addItem(item: any): Promise<void>
    abstract updateItem(id: number, item: any): Promise<void>
}

class ServerHeaderService extends HeaderService{
    async getList() : Promise<InventoryInHeader[]> {
        let resp = await fetch('http://localhost:5230/api/header');
        
        if (!resp.ok){
            throw new Error('Error from server, Please try again');
        };

        let body = await resp.json();

        //convert the date fields to actual dates BECAUSE STUPID JSON DOES NOT HAVE A DATE DATATYPE!!!!
        for (let i of body){
            i.docDate = new Date(i.docDate);
        }
        
        return body;
    }

    async deleteItem(id: number): Promise<void>{
        let resp = await fetch('http://localhost:5230/api/header/' + id, {method: 'DELETE'});
        
        if (!resp.ok){
            throw new Error('Error from server, Please try again');
        };
    }

    async addItem(item: any): Promise<void> {
        let resp = await fetch('http://localhost:5230/api/header', {
            method: 'POST', 
            body: JSON.stringify(item),
            headers: new Headers({'Content-Type':'application/json'})
        });
        
        if (!resp.ok){
            throw new Error('Error from server, Please try again');
        };
    }

    async updateItem(id: number, item: any): Promise<void> {
        let resp = await fetch('http://localhost:5230/api/header/' + id, {
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

export { HeaderService, ServerHeaderService};