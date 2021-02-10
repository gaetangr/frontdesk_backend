<Dialog
  open={idle}
  onClose={handleClose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">
    {"Êtes-vous toujours là 🧐  ?"}
  </DialogTitle>

  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Afin de protéger vos données nous allons vous déconnecter dans
      <Countdown
        intervalDelay={0}
        precision={0}
        renderer={(props) => <div>{props.total / 1000} secondes </div>}
        date={Date.now() + 30000}
      />
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary" autoFocus={true}>
      Gardez-moi en ligne
    </Button>
  </DialogActions>
</Dialog>;


  const handleOnIdle = (event) => {
    setIdle(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 30000);
  };

  const {} = useIdleTimer({
    onIdle: handleOnIdle,
    debounce: 500,
    timeout: 1000000, // if user is idle for 15mn display a
  });

   const [idle, setIdle] = useState(false);
   const [idleTime, setIdleTime] = useState(0);

   const handleClickOpen = () => {
     setIdle(true);
   };

   const handleClose = () => {
     setIdle(false);
   };
