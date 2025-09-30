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
  vision: string; 
  text: string; 
};

export type ModalData = {
    vision: string;
    text: string;
    missions: { id: number; text: string, count: number }[];
    mindsets: { id: number; text: string, count: number }[];
};

