import * as React from "react";
import toast from "react-hot-toast";

import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
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
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { Button } from "@/components/ui/button";
import { Control, FieldValues, useFieldArray } from 'react-hook-form'

interface DynamicListProps {
  columns: GridColDef[];
  initialRows?: GridRowsProp;
  control: Control<FieldValues>;
  fieldName: string
}

export function DynamicList({ columns, initialRows = [], control, fieldName }: DynamicListProps) {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const { fields, append, update, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: fieldName, // unique name for your Field Array
  });


  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }

    if ((event as React.KeyboardEvent).key === "Enter") {
      //preventing triggering of submit event on enter key press
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
    console.log(id)
    setDeleteRecordId(id);
  };

  const handleDelete = () => {
    if (!deleteRecordId) {
      return;
    }
    setRows(rows.filter((row) => row.id !== deleteRecordId));
    console.log(deleteRecordId)
    remove(Number(deleteRecordId))
    toast.success("Record deleted successfully", { position: "top-right" });
    setDeleteRecordId(null);
  };

  const handleCancel = () => {
    setDeleteRecordId(null);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    remove(Number(id))
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


    const filteredObj = Object.keys(newRow)
      .filter(key => key !== 'id' && key !== 'isNew')  // Filter out the keys you don't want
      .reduce((acc: any, key) => {
        if (typeof newRow[key] === 'object')
          acc[key] = newRow[key].toISOString();
        else
          acc[key] = newRow[key];  // Build a new object with the filtered keys
        return acc;
      }, {});
    console.log(filteredObj);
    update(newRow.id, filteredObj)

    toast.success("Record updated successfully", { position: "top-right" });
    return updatedRow;
  };

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    toast.error(error.message, { position: "top-right" });
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
              key="save"
              icon={
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
      minWidth: 120,
    },
  ];

  const [deleteRecordId, setDeleteRecordId] = React.useState<GridRowId | null>(null);

  const renderDeleteDialog = () => {
    if (!deleteRecordId) {
      return null;
    }

    return (
      <AlertDialog open={!!deleteRecordId}>
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
    <div className="flex flex-col relative">
      {renderDeleteDialog()}
      <div style={{ height: rows.length > 0 ? `${(rows.length * 52) + 110}px` : 'auto' }}>
        <DataGrid
          rows={rows}
          columns={[...columns, ...actionColumn]}
          rowSelection={false}
          disableColumnSorting
          disableColumnMenu
          hideFooter={rows.length === 0}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          // @ts-ignore
          slots={{ noRowsOverlay: AddRowButton, footer: AddRowButton }}
          // @ts-ignore
          slotProps={{ noRowsOverlay: { columns, setRows, setRowModesModel, append, fields, isNew: true }, footer: { columns, setRows, setRowModesModel, append, fields } }}
          sx={{
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
            "& .MuiDataGrid-row--editing .MuiDataGrid-cell": {
              backgroundColor: "oklch(0.97 0 0) !important",
              // border: '1px solid hsl(var(--secondary))',
            },
          }}
        />
      </div>
    </div>
  );
}

interface AddRowButtonProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
  columns: GridColDef[];
  append: any
  fields: any,
  isNew?: boolean;
}

function AddRowButton({ columns, setRows, setRowModesModel, append, fields, isNew = false }: AddRowButtonProps) {
  const generateNewRow = () => {
    // const currentLength = ;
    const id = fields.length;

    const defaultValues: Record<string, any> = {
      string: "",
      singleSelect: "",
      number: null,
      boolean: false,
      date: null,
      dateTime: null,
    };

    return columns.reduce<{ [key: string]: any }>(
      (acc, column) => {
        acc[column.field] = defaultValues[column.type as keyof typeof defaultValues] ?? "";
        return acc;
      },
      { id, isNew: true }
    );
  };

  const handleClick = () => {
    const newRow = generateNewRow();
    const filteredObj = Object.keys(newRow)
      .filter(key => key !== 'id' && key !== 'isNew')  // Filter out the keys you don't want
      .reduce((acc: any, key) => {
        if (typeof newRow[key] === 'object')
          acc[key] = newRow[key].toISOString();
        else
          acc[key] = newRow[key];  // Build a new object with the filtered keys
        return acc;
      }, {});
    append(filteredObj);
    setRows((oldRows) => [...oldRows, { ...newRow, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newRow.id]: { mode: GridRowModes.Edit, fieldToFocus: columns[0].field },
    }));
  };

  if (isNew) {
    return (
      <div className="h-full flex justify-center items-center">
        <Button size="sm" type="button" onClick={handleClick}>
          Add Row
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center scale-90 absolute" style={{ bottom: "calc(calc(var(--DataGrid-hasScrollX)*6px) + 6px)" }}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" onClick={handleClick} className="scale-75 rounded-full">
              <AddIcon className="!size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" >
            <p>Add Row</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
