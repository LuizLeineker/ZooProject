import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import bannerImg from "../../assets/banner2.png"; // Coloque sua imagem na pasta assets

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                padding: 4 ,
                backgroundColor: "#e5e9c7ff",
                minHeight: "100vh"

            }}
        >
            
            <Paper 
                elevation={6} 
                sx={{ width: '100%', maxWidth: 1000, mb: 4 }}
            >
                <img 
                    src={bannerImg} 
                    alt="Banner" 
                    style={{ width: '100%', height: 'auto', borderRadius: 4 }}
                />
            </Paper>

            
            
            <Typography variant="h3" component="h1" gutterBottom align="center">
                Sistema Zoológico
            </Typography>

            
            <Typography variant="subtitle1" align="center" gutterBottom  sx={{ fontSize: '19px', maxWidth: 850 } }>
                Este sistema foi criado para facilitar o acompanhamento dos animais e dos cuidados que eles recebem dentro do zoológico. 
                O sistema permite cadastrar novos animais, registrar informações importantes como espécie, 
                habitat, país de origem e data de nascimento, além de manter tudo organizado em um único lugar.
            </Typography>

            
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    onClick={() => navigate("/animals")}
                >
                    Área dos Animais
                </Button>

                <Button 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    onClick={() => navigate("/cuidados")}
                >
                    Cuidados dos Animais
                </Button>
            </Box>
        </Box>
    );
}
