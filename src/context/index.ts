import { createContext } from "react";

interface IContext{
    country: any;
  }
  
  
export const Context = createContext<IContext>({country:null});