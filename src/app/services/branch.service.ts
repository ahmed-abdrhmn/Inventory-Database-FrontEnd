import { Branch } from "../types/types";

abstract class BranchService {
    abstract getList(): Promise<Branch[]>;
    abstract deleteItem(id: number): Promise<void>
    abstract addItem(item: any): Promise<void>
    abstract updateItem(id: number, item: any): Promise<void>
}

class ServerBranchService extends BranchService{
    async getList() : Promise<Branch[]> {
        let resp = await fetch('http://localhost:5230/api/branch');
        
        if (!resp.ok){
            throw new Error('Error from server, Please try again');
        };

        let body = await resp.json();
        
        return body;
    }

    async deleteItem(id: number): Promise<void>{
        let resp = await fetch('http://localhost:5230/api/branch/' + id, {method: 'DELETE'});
        
        if (!resp.ok){
            throw new Error('Error from server, Please try again');
        };
    }

    async addItem(item: any): Promise<void> {
        let resp = await fetch('http://localhost:5230/api/branch', {
            method: 'POST', 
            body: JSON.stringify(item),
            headers: new Headers({'Content-Type':'application/json'})
        });
        
        if (!resp.ok){
            throw new Error('Error from server, Please try again');
        };
    }

    async updateItem(id: number, item: any): Promise<void> {
        let resp = await fetch('http://localhost:5230/api/branch/' + id, {
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

export {BranchService, ServerBranchService};