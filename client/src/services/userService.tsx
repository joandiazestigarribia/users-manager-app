const API_BASE_URL = 'https://staging.duxsoftware.com.ar/api/personal';
const SECTOR = '3000';

export interface User {
    id: string;
    usuario: string;
    estado: string;
    sector: number;
}

export const fetchAllOptions = async (): Promise<{ estados: string[], sectores: number[] }> => {
    try {
        const response = await fetch(`${API_BASE_URL}?sector=${SECTOR}`);
        if (!response.ok) {
            throw new Error(`Error http: ${response.status}`);
        }
        const data = await response.json();

        const estadosSet = new Set(data.map((user: any) => user.estado));
        const sectoresSet = new Set(data.map((user: any) => user.sector));

        return {
            estados: Array.from(estadosSet) as string[],
            sectores: Array.from(sectoresSet) as number[]
        };
    } catch (error) {
        console.error('Error en fetching:', error);
        return { estados: [], sectores: [] };
    }
};

export const fetchUsers = async (
    page: number = 1,
    limit: number = 10,
    search?: string,
    status?: string,
    sector?: string
): Promise<{ users: User[], estados: string[], sectores: number[] }> => {
    let url = `${API_BASE_URL}?sector=${SECTOR}&_page=${page}&_limit=${limit}`;
    if (search) url += `&usuario_like=${encodeURIComponent(search)}`;
    if (status && status !== 'TODOS') url += `&estado=${encodeURIComponent(status)}`;
    if (sector && sector !== 'TODOS') url += `&sector=${encodeURIComponent(sector)}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Error en fetch de usuarios');
    }
    const users: User[] = await response.json();

    const estadosSet = new Set(users.map(user => user.estado));
    const sectoresSet = new Set(users.map(user => user.sector));

    return {
        users,
        estados: Array.from(estadosSet),
        sectores: Array.from(sectoresSet)
    };
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, sector: SECTOR }),
    });
    if (!response.ok) {
        throw new Error('Error al crear el usuario');
    }
    return response.json();
};

export const updateUser = async (user: User): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
    }
    return response.json();
};

export const deleteUser = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
    }
};