import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Livestock {
  id?: number;
  type: string;
  breed: string;
  age: number;
  healthStatus: string;
}

interface LivestockFormProps {
  onSubmit: SubmitHandler<Livestock>;
  initialValues?: Livestock;
}

interface LivestockTableProps {
  livestock: Livestock[];
  onDeleteClick: (id: number) => void;
}

const validationSchema = yup.object().shape({
  type: yup.string().required("Type is required"),
  breed: yup.string().required("Breed is required"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive number"),
  healthStatus: yup.string().required("Health Status is required"),
});

const fetchLivestock = async () => {
  const response = await axios.get<Livestock[]>(
    "http://localhost:3000/livestock"
  );
  return response.data;
};

const createLivestock = async (livestock: Livestock) => {
  const response = await axios.post<Livestock>(
    "http://localhost:3000/livestock",
    livestock
  );
  return response.data;
};

const editLivestock = async (livestock: Livestock) => {
  const response = await axios.put<Livestock>(
    `http://localhost:3000/livestock/${livestock.id}`,
    livestock
  );
  return response.data;
};

const deleteLivestock = async (id: number) => {
  const response = await axios.delete<Livestock>(
    `http://localhost:3000/livestock/${id}`
  );
  return response.data;
};

const LivestockForm: React.FC<LivestockFormProps> = ({
  onSubmit,
  initialValues,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="type"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            label="Type"
            fullWidth
            {...field}
            error={!!errors.type}
            helperText={errors.type?.message}
            style={{ marginBottom: 16 }}
          />
        )}
      />
      <Controller
        name="breed"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            label="Breed"
            fullWidth
            {...field}
            error={!!errors.breed}
            helperText={errors.breed?.message}
            style={{ marginBottom: 16 }}
          />
        )}
      />
      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <TextField
            label="Age"
            fullWidth
            {...field}
            error={!!errors.age}
            helperText={errors.age?.message}
            style={{ marginBottom: 16 }}
          />
        )}
      />
      <Controller
        name="healthStatus"
        control={control}
        render={({ field }) => (
          <TextField
            label="Health Status"
            fullWidth
            {...field}
            error={!!errors.healthStatus}
            helperText={errors.healthStatus?.message}
            style={{ marginBottom: 16 }}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: 16 }}
      >
        Add Livestock
      </Button>
    </form>
  );
};

const LivestockTable: React.FC<LivestockTableProps> = ({
  livestock,
  onDeleteClick,
}) => {
  const queryClient = useQueryClient();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingLivestock, setEditingLivestock] = useState<Livestock | null>(
    null
  );

  const handleEditClick = (livestock: Livestock) => {
    setEditingLivestock(livestock);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditingLivestock(null);
    setEditDialogOpen(false);
  };

  const editLivestockMutation = useMutation({
    mutationFn: editLivestock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["livestock"] });
    },
  });

  const handleLivestockEdit: SubmitHandler<Livestock> = (editingLivestock) => {
    editLivestockMutation.mutate(editingLivestock);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Breed</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Health Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {livestock?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.breed}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.healthStatus}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    onClick={() => onDeleteClick(Number(row.id))}
                  >
                    Delete
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleEditClick(row)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Livestock</DialogTitle>
        <DialogContent>
          <LivestockForm
            onSubmit={(data) => {
              handleLivestockEdit(data);
              handleEditDialogClose();
            }}
            initialValues={editingLivestock || undefined}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="secondary">
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleEditDialogClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Dashboard: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: livestockData, isLoading: livestockLoading } = useQuery({
    queryKey: ["livestock"],
    queryFn: fetchLivestock,
  });

  const addLivestockMutation = useMutation({
    mutationFn: createLivestock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["livestock"] });
    },
  });

  const handleLivestockSubmit: SubmitHandler<Livestock> = (data) => {
    addLivestockMutation.mutate(data);
  };

  const handleDeleteLivestock = (id: number) => {
    deleteLivestock(id).then(() => {
      queryClient.invalidateQueries({ queryKey: ["livestock"] });
    });
  };

  return (
    <>
      <Typography variant="h4">Livestock Form</Typography>
      <LivestockForm onSubmit={handleLivestockSubmit} />
      <Typography variant="h4" mt={4}>
        Livestock List
      </Typography>
      {livestockLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <LivestockTable
          livestock={livestockData || []}
          onDeleteClick={handleDeleteLivestock}
        />
      )}
    </>
  );
};

export default Dashboard;
