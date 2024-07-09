import * as React from "react";
import axios from "axios";
import { Post } from "../../Interface/Post";
import { Button, Container, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Second from "../Second/Second";

const useStyles = makeStyles({
  container: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  dataGrid: {
    height: 600,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
  },
  header: {
    marginBottom: '20px',
  }
});

const PostList: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the posts:", error);
        setError("Error fetching the posts");
        setLoading(false);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 300 },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h4" style={{alignContent:'center', textAlign:'center', marginTop:'20px',marginBottom:'20px'}} className={classes.header}>Posts</Typography>
      <div className={classes.dataGrid}>
        <DataGrid
          rows={posts}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </div>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/Second')} 
        style={{ marginTop: '20px' }}
      >
        Visit the Second Page
      </Button>
    </Container>
  );
};

export default PostList;
