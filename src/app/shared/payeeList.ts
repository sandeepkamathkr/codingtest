interface Primary {
  isPrimary: boolean;
}

interface Payee {
  name: string;
  payeeType: 'PAY_ANYONE' | 'BPAY' | 'LINKED';
  primary: Primary;
}

export const payeeList: Array<Payee> = [
  {
    name: 'Mary',
    payeeType: 'PAY_ANYONE',
    primary: { isPrimary: false },
  },
  {
    name: 'Zachary',
    payeeType: 'BPAY',
    primary: { isPrimary: false },
  },
  {
    name: 'Andy',
    payeeType: 'BPAY',
    primary: { isPrimary: false },
  },
  {
    name: 'Sam',
    payeeType: 'LINKED',
    primary: { isPrimary: false },
  },
  {
    name: 'John',
    payeeType: 'BPAY',
    primary: { isPrimary: false },
  },
  {
    name: 'Alex',
    payeeType: 'PAY_ANYONE',
    primary: { isPrimary: false },
  },
  {
    name: 'Zac',
    payeeType: 'LINKED',
    primary: { isPrimary: true },
  },
  {
    name: 'Angela',
    payeeType: 'LINKED',
    primary: { isPrimary: false },
  },
  {
    name: 'Ben',
    payeeType: 'PAY_ANYONE',
    primary: { isPrimary: false },
  },
];

