import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    media: {
        borderRadius: "20px",
        objectFit: "cover",
        width: "100%",
        height: '100%',
        maxHeight: "500px",
    },

    card: {
        display: "flex",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
            flexWrap: "wrap",
            flexDirection: "column"
        },
    },

    section: {
        borderRadius: "20px",
        margin: "10px",
        flex: 1,
        display: "block",
        width: "50%"
    },
    imageSection: {
        display: "block",
        width: "50%",
        marginLeft: "20px",
        [theme.breakpoints.down("sm")]: {
            marginLeft: 0
        }
    },
    recommendedPosts: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column"
        }
    },

    loadingPaper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh"
    },
    miniCard: {
        display: "block",
        width: "300px",
        margin: "20px",
        cursor: "pointer"
    },
    image: {
        display: "block",
        width: "100%",
        height: "150px",
        borderRadius: "10px"
    }
}))