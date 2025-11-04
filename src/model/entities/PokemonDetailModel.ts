export interface PokemonDetailModel {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: { front_default: string | null;};
    types: Array<{ slot: number; type: { name: string; url: string } }>;
    abilities?: Array<any>;
    stats?: Array<any>;
}