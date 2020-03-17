const modal = $.modal({
  title: "Hello",
  text: `<p>text of modal</p>`,
  width: 400,
  closable: true,
  footerButtons: [
    {
      text: "Ok",
      type: "primary",
      handler() {
        modal.close();
        console.log("primary button is clicked!");
      }
    },
    {
      text: "Cancel",
      type: "Danger",
      handler() {
        modal.close();
        console.log("secondary button is clicked!");
      }
    }
  ]
});
modal.open();
