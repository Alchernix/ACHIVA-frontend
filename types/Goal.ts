export type Mission = { 
  id: number; 
  text: string; 
  count: number; 
};

export type Mindset = { 
  id: number; 
  text: string; 
  count: number; 
};

export type Vision = { 
  id: number;
  vision: string; 
  count: number;
};

export type ModalData = {
    vision: string;
    missions: { id: number; text: string; count: number }[];
    mindsets: { id: number; text: string; count: number }[];
};

