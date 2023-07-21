import { useState } from "react";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosClient } from "../api/axiosClient";

export const LoginLayout = () => {
    const form = useForm();
    const { register, getValues, handleSubmit } = form;

    const [sending, setSending] = useState(false);
    const navigate = useNavigate();
    const csrf = () => axiosClient.get("/sanctum/csrf-cookie");

    const onSubmit = async () => {
        setSending(true);
        await csrf();
        console.log({
            email: getValues("email"),
            password: getValues("password"),
        });
        try {
            await axiosClient.post("/login", {
                email: getValues("email"),
                password: getValues("password"),
            });
            navigate("/");
            setSending(false);
        } catch (error) {
            console.log(error);
            setSending(false);
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                overflow: "hidden",
                background: "#F7F9FC",
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            component="div"
        >
            <Box width={400}>
                <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    fontWeight="bold"
                    sx={{ mb: 2 }}
                >
                    Сиситема управления проводами
                </Typography>
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ mb: 2 }} align="center">
                        Вход в систему
                    </Typography>
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            type="text"
                            size="small"
                            fullWidth
                            sx={{ mb: 2 }}
                            label="Email"
                            {...register("email", {
                                required: "Логин обязательный",
                            })}
                        />
                        <TextField
                            type="password"
                            size="small"
                            fullWidth
                            sx={{ mb: 2 }}
                            label="Пароль"
                            {...register("password", {
                                required: "Пароль не должен быть пустым",
                            })}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={sending}
                        >
                            Войти
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Box>
    );
};
