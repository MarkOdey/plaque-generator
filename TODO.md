- Provide proper plotting for render of outlined text
  - The cnc cuts out the contour of each letter.
  - Needs to leave at least one gap per shape so letters stays together
  - Needs to take into account the bit size.
  
- Provide proper plotting for render of hollowed text
  - The cnc cuts out every outer shape. 
  - For interior shapes need provide at least one tab to connect so they don't fall off.
  - Need to take into account the bit size.
  

- Find a manageable way to parametrize shapes
  - Idealy we don't want to loose reference and dynamic data previously set.
