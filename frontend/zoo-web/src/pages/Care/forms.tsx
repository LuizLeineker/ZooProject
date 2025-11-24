import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Paper } from "@mui/material";
import { type Care } from "../../models/Care";
import * as careAPI from "../../api/careAPI";

export default function CareFormPage() {
    const { id } = useParams();
    const nav = useNavigate();

    const [form, setForm] = useState<Care>({
        careId: 0,
        name: "",
        description: "",
        frequency: ""
    });

    const [loading, setLoading] = useState(!!id);

  async function loadCare() {
        if (!id) return;
        try {
            const resposta = await careAPI.getCareById(Number(id));
            setForm(resposta.data); 
        } catch {
            alert("ID não encontrado!");
            nav("/cuidados");
        } finally {
            setLoading(false);
        }
    }

    function update(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function save() {
        try {
            if (id) await careAPI.updateCare(Number(id), form);
            else await careAPI.createCare(form);

            alert(`Cadastro ${id ? "atualizado" : "criado"} com sucesso!`);
            nav("/cuidados");
        } catch {
            alert(`Infelizmente não foi possivel ${id ? "atualizar o" : "criar um "} cadastro.`);
        }
    }

    useEffect(() => {
        if (id) loadCare();
    }, [id]);

    if (loading) return <h3>Carregando...</h3>;

    return (
        <Paper style={{ padding: 20, margin: 20, maxWidth: 600 }}>
            <h2>{id ? "Editar Cuidado" : "Cadastrar Cuidado"}</h2>

            <TextField
                label="Nome"
                name="name"
                fullWidth
                value={form.name}
                onChange={update}
                style={{ marginBottom: 20 }}
            />
            <TextField
                label="Descrição"
                name="description"
                fullWidth
                value={form.description}
                onChange={update}
                style={{ marginBottom: 20 }}
            />
            <TextField
                label="Frequência"
                name="frequency"
                fullWidth
                value={form.frequency}
                onChange={update}
                style={{ marginBottom: 20 }}
            />

            <Button variant="contained" onClick={save}>
                Salvar
            </Button>
            <Button
                variant="outlined"
                style={{ marginLeft: 10 }}
                onClick={() => nav("/cuidados")}
            >
                Cancelar
            </Button>
        </Paper>
    );
}
