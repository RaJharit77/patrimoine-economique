import { Button, Container, Grid, Typography } from '@mui/material';
import { keyframes, styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../../../data/data.json';

const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const AnimatedButton = styled(Button)(({ theme }) => ({
    animation: `${fadeInUp} 1s`,
}));

const HomePage = () => {
    const [userName, setUserName] = useState('');
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        const fetchUserName = () => {
            try {
                const personneData = data.filter(item => item.model === 'Personne');

                if (personneData.length > 0 && personneData[0].data && personneData[0].data.nom) {
                    setUserName(personneData[0].data.nom);
                } else {
                    console.error('Données de personne ou nom introuvables.');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du nom de l\'utilisateur', error);
            }
        };

        fetchUserName();
    }, []);

    const handleButtonClick = () => {
        setShowButtons(!showButtons);
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                overflowX: 'hidden',
                textAlign: 'center'
            }}
        >
            <Typography variant="h4" sx={{ mb: 2 }}>
                Bienvenue sur le site de gestion de la patrimoine {userName}
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={handleButtonClick}
                sx={{ mb: 2 }}
            >
                Cliquez ici
            </Button>

            {showButtons && (
                <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                    <Grid item>
                        <AnimatedButton
                            component={Link}
                            to="/possession"
                            variant="contained"
                            color="info"
                            sx={{ animationDelay: '0.25s' }}
                        >
                            Possession
                        </AnimatedButton>
                    </Grid>
                    <Grid item>
                        <AnimatedButton
                            component={Link}
                            to="/patrimoine"
                            variant="contained"
                            color="info"
                            sx={{ animationDelay: '0.75s' }}
                        >
                            Patrimoine
                        </AnimatedButton>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default HomePage;
