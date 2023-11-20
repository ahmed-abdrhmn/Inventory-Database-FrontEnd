export type HeaderDialogData = {
    lists: {
      branchIds: number[]
    }
    form?: { //this will only be filled in an add form
      branchId: number | null
      docDate: Date | null,
      reference: string | null,
      remarks: string | null,
    }
  }