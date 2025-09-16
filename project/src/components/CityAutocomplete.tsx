// src/components/CityAutocomplete.tsx
import React, { useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import Fuse from "fuse.js";
import villages from "../data/villages.json";

interface City {
  name: string;
  lat: number;
  lon: number;
}

const fuse = new Fuse<City>(villages, {
  keys: ["name"],
  threshold: 0.3, // fuzzy level: lower = stricter, higher = fuzzier
});

const CityAutocomplete: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
}> = ({ label, value, onChange }) => {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (_: any, newInput: string) => {
    if (!newInput) {
      setOptions([]);
      return;
    }

    setLoading(true);

    // Offline fuzzy search
    const results = fuse.search(newInput).map((r) => r.item.name);

    setOptions(results);
    setLoading(false);
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      value={value}
      onInputChange={handleInputChange}
      onChange={(_, val) => onChange(val || "")}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={18} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default CityAutocomplete;
