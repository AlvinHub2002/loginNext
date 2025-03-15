import { DataGridColumn } from "@/types/form-schema";
import { GridColDef, GridSingleSelectColDef } from "@mui/x-data-grid";

// Ensure the return type of generateDataGridSchema matches the expected values for GridColDef
export default function generateDataGridSchema(jsonData: DataGridColumn[]): GridColDef[] {
    return jsonData.map(item => {
        const colDef: GridColDef = {
            field: item.fieldId,
            headerName: item.label,
            description: item.description || '',
            type: getDataGridType(item.fieldType),
            flex: 1,
            editable: true,
            minWidth: 150,
        };

        // If the column is a 'singleSelect', cast it to GridSingleSelectColDef to allow valueOptions
        if (colDef.type === 'singleSelect') {
            const singleSelectColDef = colDef as GridSingleSelectColDef;
            singleSelectColDef.valueOptions = item.options;
        }

        return colDef;
    });
}

// Modify the getDataGridType function to return a value that aligns with GridColDef's valid types
function getDataGridType(fieldType: any): 'string' | 'date' | 'singleSelect' {
    switch (fieldType) {
        case "Short Input Fields":
        case "Text area":
            return 'string';
        case "Dropdown":
        case "Multiple choice":
        case "Radio":
            return 'singleSelect';
        case "Date Picker":
        case "Time picker":
            return 'date';
        default:
            return 'string'; // Default to 'string' if no match
    }
}
