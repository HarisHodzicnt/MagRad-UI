type LogRegSame = {
  Email: string
  Password: string
}

export type Login = {
  RememberMe: boolean
} & LogRegSame

export type Registration = {
  ConfirmPassword: string
  UserRoleApp: "employee" | "employeer" | "select"
  City: string
} & LogRegSame




export type User={
  Id:string,
  Name:string,
  LastName:string,
  Phone:string,
  City:string,
  Email:string,
  Photo?:File,
  PhotoPath:string
} 

export type Employee = User & {
  //PhotoPath:string to je u bazi
  PrimaryWork:string,
  Payment:string,
  DescriptionWork:string,
  PhotoGallery:any,
  TotalMark?:number
  //PhotoGalleryPath:string to je u bazi
}

export type Employeer=User

export type Job={
  Id:number, 
  Title:string,
  Description:string,
  Payment:number, 
  EmployeerId:string, 
  StartDate:Date
}

export type Proposal={
  Id:number,
  EmployeeId:string,
  EmployeerId:string,
  JobPostId:number,
  StartDate:Date,
  EndDate:Date,
  Comment:string,
  OverView:string,
  Mark:number,
  MoneyRequire:number,
  Status?:"zavrseno" | "prijava" | "razmatra se" | "odbijeno"
}


export type EmployeeWorks={
   Id?:number,
   EmployeeeId:string, 
   Photos?:File[],
   Title:string,
   Description:string,
   PhotoGalleryPath?:string[],
   AllPathsPhotos:string
}
