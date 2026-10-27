export type ListItem = {
	id: string;
	title: string;
};

export type List = {
	id: string;
	title: string;
	listItems: ListItem[];
};

export type User = {
	id: string;
	email: string;
	password: string | null;
	google_id: string | null;
}
