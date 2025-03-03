import * as React from "react";

import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridNoRowsOverlay,
} from "@mui/x-data-grid";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface DynamicListProps {
  columns: GridColDef[];
  initialRows?: GridRowsProp;
}

export function DynamicList({ columns, initialRows = [] }: DynamicListProps) {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }

    if ((event as React.KeyboardEvent).key === 'Enter') { //preventing triggering of submit event on enter key press
      (event as React.KeyboardEvent).preventDefault();
      (event as React.KeyboardEvent).stopPropagation();
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setDeleteRecordId(id);
  };

  const handleDelete = () => {
    if (!deleteRecordId) {
      return;
    }
    setRows(rows.filter((row) => row.id !== deleteRecordId));
    toast.success("Record deleted successfully", { position: 'top-right' });
    setDeleteRecordId(null);
  };

  const handleCancel = () => {
    setDeleteRecordId(null);
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    for (const key in newRow) {
      if (newRow[key] === undefined || newRow[key] === null || newRow[key] === "") {
        throw new Error(`${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty`);
      }
    }

    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    toast.success("Record updated successfully", { position: 'top-right' });
    return updatedRow;
  };

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    toast.error(error.message, { position: 'top-right' });
  }, []);

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const actionColumn: GridColDef[] = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      resizable: false,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key="save" icon={
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SaveIcon />
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Save</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              }
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key="cancel"
              icon={
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CancelIcon />
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Cancel</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              }
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key="edit"
            icon={
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <EditIcon />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Edit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            }
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"

          />,
          <GridActionsCellItem
            key="delete"
            icon={
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DeleteIcon />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            }
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
      flex: 1,
    },
  ];

  const [deleteRecordId, setDeleteRecordId] = React.useState<GridRowId | null>(null);

  const renderDeleteDialog = () => {
    if (!deleteRecordId) {
      return null;
    }

    return (
      <AlertDialog open={!!deleteRecordId} >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <div className="flex flex-col">
      {renderDeleteDialog()}
      <DataGrid
        rows={rows}
        columns={[...columns, ...actionColumn]}
        rowSelection={false}
        disableColumnSorting
        disableColumnMenu
        hideFooter={true}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        //@ts-ignore
        slots={{ noRowsOverlay: AddRowButton }}
        // @ts-ignore
        slotProps={{ noRowsOverlay: { columns, setRows, setRowModesModel, isNew: true } }}
        sx={
          {
            // border: 0,
            // "& .MuiDataGrid-main": {
            //   border: '1px solid hsl(var(--border))',
            //   borderRadius: '5px',
            // },
            // "& .css-1nszl05-MuiDataGrid-root": {
            //   flexDirection: 'column-reverse',
            // },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // For removing select input border in data grid
            },
            // '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
            //   border: '1px solid hsl(var(--border))',
            // },
            // '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
            //   border: '1px solid hsl(var(--border))',
            //   borderRadius: '0px',
            // },
            // '& .MuiDataGrid-columnSeparator--resizable': {
            //   color: 'transparent'
            // },
            '& .MuiDataGrid-row--editing .MuiDataGrid-cell': {
              backgroundColor: 'oklch(0.97 0 0) !important',
              // border: '1px solid hsl(var(--secondary))',
            },
          }}
      />
      {rows.length > 0 &&
        <AddRowButton columns={columns} setRows={setRows} setRowModesModel={setRowModesModel} />
      }
    </div>
  );
}

interface AddRowButtonProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
  columns: GridColDef[];
  isNew?: boolean;
}

function AddRowButton({ columns, setRows, setRowModesModel, isNew = false }: AddRowButtonProps) {

  const generateNewRow = () => {
    const id = Math.floor(Math.random() * 100000);
    const newRow = columns.reduce((acc: { [key: string]: any }, column) => {
      switch (column.type) {
        case "string":
          acc[column.field] = "";
          break;
        case "date":
          acc[column.field] = new Date();
          break;
        case "number":
          acc[column.field] = undefined;
          break;
        case "boolean":
          acc[column.field] = false;
          break;
        case "singleSelect":
          acc[column.field] = '';
          break;
        case "dateTime":
          acc[column.field] = new Date();
          break;
        default:
          acc[column.field] = "";
          break;
      }
      return acc;
    }, { id, isNew: true });
    return newRow;
  }



  const handleClick = () => {
    const newRow = generateNewRow();
    setRows((oldRows) => [...oldRows, { ...newRow, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel, [newRow.id]: { mode: GridRowModes.Edit, fieldToFocus: columns[0].field },
    }));
  };

  if (isNew) {
    return (
      <div className="h-full flex justify-center items-center">
        <Button size="sm" type="button" onClick={handleClick}>Add Row</Button>
      </div>
    )
  }

  return (
    <div className="flex justify-center scale-90">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" onClick={handleClick} className="scale-75 rounded-full">
              <AddIcon className="!size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Add Row</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}