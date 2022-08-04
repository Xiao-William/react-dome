
import { createTheme, ThemeProvider as Provider } from "@mui/material";


const ThemeProvider = (props: any) => {
    const theme = createTheme({
        palette: {
            mode: "light",
            primary: {
                main: "#0fa6a2",
            },
            secondary: { main: "#8eb8e7" },
            background: {
                paper: "",
            },
        },
        shape: { borderRadius: 4 },
    });

    return (
        <Provider theme={theme}>{props.children}</Provider>
    )
}
export { ThemeProvider }