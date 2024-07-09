local ws, err = http.websocket("ws://localhost:43509")
 
if not ws then
    print("Failed to connect to WebSocket server:", err)
    return
end
 
print("Connected to WebSocket server")
 
-- Function to handle incoming messages
local function handleMessage(message)
    print("Received message:", message)
    if message == "forward" then
        turtle.forward()
    elseif message == "back" then
        turtle.back()
    elseif message == "left" then
        turtle.turnLeft()
    elseif message == "right" then
        turtle.turnRight()
    elseif message == "up" then
        turtle.up()
    elseif message == "down" then
        turtle.down()
    elseif message == "refuel" then
        turtle.refuel()
    elseif message == "dig" then
        turtle.dig()
 
    end
end
 
-- Send a message to the WebSocket server
ws.send("Hello from ComputerCraft!")
 
-- Main loop to listen for messages
while true do
    local message = ws.receive()
    if message then
        handleMessage(message)
    end
end
 
-- Close the WebSocket connection when done
ws.close()