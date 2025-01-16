<script></script>
<!--Modal for cookie conscent-->
<div style="display:inline-block;">
  <div class="switch-container">
      <span class="label-text">Save Cookie</span>
      <label class="switch">
        <input type="checkbox">
        <span class="slider"></span>
      </label>
  </div>
</div>
<style>
  .switch-container {
      flex-direction: column; /* Stacks flex items vertically */
      display: flex;
      align-items: center; /* Align text and switch vertically */
      margin: 10px;
  }
  .label-text{
      vertical-align:middle;
  }
   /* The switch - the box around the slider */
  .switch {
      vertical-align:middle;
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
  }

  /* Hide default HTML checkbox */
  .switch input {
  opacity: 0;
  width: 0;
  height: 0;
  }

  /* The slider */
  .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  /* opacity:70%; */
  -webkit-transition: .4s;
  transition: .4s;
  }

  .slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: hsl(0, 0%, 100%);
  /* opacity:70%; */
  -webkit-transition: .4s;
  transition: .4s;
  }

  input:checked + .slider {
  background-color: #2196F3;
  }

  input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
  }
</style>