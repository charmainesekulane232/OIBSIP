import tkinter as tk

def button_clicked(value):
    print(f"Button {value} clicked")  # Placeholder implementation

button_values = [
    ["AC", "+/-", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "√", "="]
]

right_symbols = ["÷", "×", "-", "+", "="]
top_symbols = ["AC", "+/-", "%"]

low_count = len(button_values)  # 5
column_count = len(button_values[0])  # 4

color_light_pink = "#C21F5D"
color_light_yellow = "#075081"
color_light_blue = "#C5DFFF"
color_black = "#000000"
color_white = "#FFFFFF"


#Window setup
Window=tk.Tk() 
Window.title("Calculator") 
Window.resizable (False,False)

frame = tk.Frame(Window)
label = tk.Label(frame, text="0", font=("Arial", 45), background=color_black, anchor='e',width=column_count*2,
                           foreground=color_white)
label.grid(row=0, column=0, columnspan=column_count, sticky="WE")

for row in range(low_count):
    for column in range(column_count):
        value = button_values[row][column]
        button = tk.Button(frame, text=value, font=("Arial", 30), width=column_count-1, height=1,
                           command=lambda value=value: button_clicked(value))
        
        if value in top_symbols:
            button.configure(background=color_light_pink, foreground=color_black)
        elif value in right_symbols:
            button.configure(background=color_light_blue, foreground=color_black)
        else:
            button.configure(background=color_light_yellow, foreground=color_black)
        button.grid(row=row+1, column=column)

frame.pack()

#A+B,A-B,A*B,A/B
A='0'
operator=None
B=None

def clear_all():
    global label, A, B, operator
    label['text']='0'
    A='0'
    B=None
    operator=None

def remove_decimal_zero(num):
    if num % 1 == 0:
        num=int(num)
        return str(num)
    else:
        return num

def button_clicked(value):
    global right_symbols, top_symbols,label, A, B, operator

    if value in right_symbols:
        if value in ['÷', '×', '-', '+']:
            A=label['text']
            operator=value
            label['text']='0'
        elif value=='=':
            if operator is not None:
                B=label['text']
                result=0
                if operator=='÷':
                    result=float(A)/float(B)
                elif operator=='×':
                    result=float(A)*float(B)
                elif operator=='-':
                    result=float(A)-float(B)
                elif operator=='+':
                    result=float(A)+float(B)
                label['text']=remove_decimal_zero(result)
                A='0'
                B=None
                operator=None
        elif value=='√':
            result=float(label['text'])**0.5
            label['text']=remove_decimal_zero(result)
    elif value in top_symbols:
        if value=='AC':
            clear_all()
            label['text']='0'

    elif value=='+/-':
        result=float(label['text'])*-1
        label['text']=remove_decimal_zero(result)
    elif value=='%':
        result=float(label['text'])/100
        label['text']=remove_decimal_zero(result)

    else:#digits or .
        if value=='.':
            if value not in label['text']:
                label['text']+=value #append .
        elif value in '0123456789':
            if label['text']=='0':
                label['text']=value #replace 0 with digit
            else:
                label['text']+=value #append digit
                

#center the window
Window.update() #update Window with new size dimensions
Window_width = Window.winfo_width()
Window_height = Window.winfo_height()
screen_width = Window.winfo_screenwidth()
screen_height = Window.winfo_screenheight()

Window_x =int((screen_width/2) - (Window_width/2))
Window_y =int((screen_height/2) - (Window_height/2))

#format '(w)x(h)+(x)+(y)'
Window.geometry (f"{Window_width}x{Window_height}+{Window_x}+{Window_y}")

Window.mainloop()


