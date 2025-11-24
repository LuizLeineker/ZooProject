import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Paper } from "@mui/material";
import { type Animal } from "../../models/Animal";
import * as animalAPI from "../../api/animalAPI";

export default function AnimalFormPage() {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [form, setForm] = useState<Animal>({
        animalId: 0,
        name: "",
        description: "",
        birth: "",
        species: "",
        habitat: "",
        countryOrigin: ""
    });

    const [loading, setLoading] = useState(!!id);

    // load para o update
    async function loadAnimal() {
        if (!id) return;
        try {
            const resposta  = await animalAPI.getAnimalById(Number(id));
            setForm({
                ...resposta.data, animalId: resposta .data.animalId ?? Number(id)
            });
        } catch {
            alert("ID não encontrado!");
            navigate("/animals");
        } finally {
            setLoading(false);
        }
    }

    function updateForm(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function save() {
        try {
            if (id) await animalAPI.updateAnimal(form.animalId, form);
            else await animalAPI.createAnimal(form);

            alert(`Cadastro ${id ? "atualizado" : "criado"} com sucesso!`);
            navigate("/animals");
        } catch {
            alert(`Infelizmente não foi possivel ${id ? "atualizar o" : "criar um "} cadastro.`);
        }
    }

    useEffect(() => {
        if (id) loadAnimal();
    }, [id]);

    if (loading) return <h3>Carregando...</h3>;

    return (
        <Paper style={{ padding: 20, margin: 20, maxWidth: 600 }}>
            <h2>{id ? "Editar Animal" : "Cadastrar Animal"}</h2>

            <TextField
                label="Nome"
                name="name"
                fullWidth
                value={form.name}
                onChange={updateForm}
                style={{ marginBottom: 20 }}
            />
            <TextField
                label="Descrição"
                name="description"
                fullWidth
                value={form.description}
                onChange={updateForm}
                style={{ marginBottom: 20 }}
            />
            <TextField
                label="Nascimento"
                name="birth"
                fullWidth
                value={form.birth}
                onChange={updateForm}
                style={{ marginBottom: 20 }}
            />
            <TextField
                label="Espécie"
                name="species"
                fullWidth
                value={form.species}
                onChange={updateForm}
                style={{ marginBottom: 20 }}
            />
            <TextField
                label="Habitat"
                name="habitat"
                fullWidth
                value={form.habitat}
                onChange={updateForm}
                style={{ marginBottom: 20 }}
            />
            <TextField
                label="País de Origem"
                name="countryOrigin"
                fullWidth
                value={form.countryOrigin}
                onChange={updateForm}
                style={{ marginBottom: 20 }}
            />

            <Button variant="contained" onClick={save}>
                Salvar
            </Button>
            <Button
                variant="outlined"
                style={{ marginLeft: 10 }}
                onClick={() => navigate("/animals")}
            >
                Cancelar
            </Button>
        </Paper>
    );
}
