export interface Transaction {
    id:          string;
    source:      string;
    destination: string;
    balance:     number;
    state:       string;
}
