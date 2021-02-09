<Autocomplete
  id="highlights-demo"
  options={items}
  openText="Trouver une note"
  getOptionLabel={(option) => option.date}
  style={{ width: 200 }}
  renderInput={(params) => (
    <TextField
      {...params}
      helperText=""
      label="Chercher une note"
      variant="outlined"
    />
  )}
  renderOption={(option, { inputValue }) => {
    const matches = match(option.created, inputValue);
    const parts = parse(option.content, matches);

    return (
      <div>
        {parts.map((part, index) => (
          <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    );
  }}
/>;


      <Autocomplete
        id="highlights-demo"
        options={items}
        openOnFocus="false"
        noOptionsText="Consigne introuvable"
        openText="Trier par date"
        getOptionLabel={(option) => option.content}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            helperText=""
            onChange={console.log()}
            label="Chercher une consigne"
            variant="outlined"
          />
        )}
        renderOption={(option, { inputValue }) => {
          const matches = match(option.content, inputValue);
          const parts = parse(option.content, matches);

          return (
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 900 : 200 }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          );
        }}
      />;
