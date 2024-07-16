local ws, err = http.websocket("ws://31.153.2.243:43509")
 
if not ws then
    print("Failed to connect to WebSocket server:", err)
    return
end
 
print("Connected to WebSocket server")
 
local homeCoords = nil
 
-- Function to set home coordinates
local function setHome()
    local x, y, z = gps.locate()
    if x and y and z then
        homeCoords = {x, y, z}
        print("Home set to: " .. textutils.serialize(homeCoords))
    else
        print("Failed to set home, no GPS signal.")
    end
end
 
-- Function to return to home coordinates
local function returnHome()
    if not homeCoords then
        print("Home coordinates not set.")
        return
    end
 
    local x, y, z = gps.locate()
    if not (x and y and z) then
        print("Failed to get current coordinates.")
        return
    end
 
    -- Navigate to home coordinates
    while z > homeCoords[3] do
        turtle.forward()
        z = z - 1
    end
    while x > homeCoords[1] do
        turtle.turnLeft()
        turtle.forward()
        turtle.turnRight()
        x = x - 1
    end
    while x < homeCoords[1] do
        turtle.turnRight()
        turtle.forward()
        turtle.turnLeft()
        x = x + 1
    end
    print("Returned to home.")
end
 
-- Function to update inventory and send it to WebSocket server
local function updateInventory()
    local inventory = {}
    for i = 1, 16 do
        local item = turtle.getItemDetail(i)
        if item then
            inventory[i] = item
        end
    end
    ws.send(textutils.serializeJSON(inventory))
end
 
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
    elseif message == "digUp" then
        turtle.digUp()
    elseif message == "digDown" then
        turtle.digDown()
    elseif message == "place" then
        turtle.place()
    elseif message == "placeUp" then
        turtle.placeUp()
    elseif message == "placeDown" then
        turtle.placeDown()
    elseif message == "suck" then
        turtle.suck()
    elseif message == "suckUp" then
        turtle.suckUp()
    elseif message == "suckDown" then
        turtle.suckDown()
    elseif message == "drop" then
        turtle.drop()
    elseif message == "dropUp" then
        turtle.dropUp()
    elseif message == "dropDown" then
        turtle.dropDown()
    elseif message == "inspect" then
        local success, data = turtle.inspect()
        if success then
            ws.send(textutils.serialize(data.name))
        else
            ws.send("Nothing to inspect")
        end
    elseif message == "inspectUp" then
        local success, data = turtle.inspectUp()
        if success then
            ws.send(textutils.serialize(data.name))
        else
            ws.send("Nothing to inspect")
        end
    elseif message == "inspectDown" then
        local success, data = turtle.inspectDown()
        if success then
            ws.send(textutils.serialize(data.name))
        else
            ws.send("Nothing to inspect")
        end
    elseif message == "craft" then
        turtle.craft()
    elseif message == "getFuel" then
        local fuelLevel = turtle.getFuelLevel()
        ws.send(fuelLevel)
    elseif message == "update" then
        updateInventory()
    elseif message == "stop" then
        -- Stop execution
        return
    elseif message == "setHome" then
        setHome()
    elseif message == "return" then
        returnHome()
	elseif string.sub(message, 1, 6) == "select" then
        local params = { string.match(message, "select (%d+)") }
		local slot = tonumber(params[1])
		turtle.select(slot+1)
    elseif string.sub(message, 1, 8) == "excavate" then
        local params = { string.match(message, "excavate (%d+) (%d+) (%d+)") }
        local length = tonumber(params[1])
        local width = tonumber(params[2])
        local depth = tonumber(params[3])
        if length and width and depth then
            for d = 1, depth do
                for w = 1, width do
                    for l = 1, length do
                        turtle.dig()
                        turtle.forward()
                    end
                    if w < width then
                        if w % 2 == 1 then
                            turtle.turnRight()
                            turtle.dig()
                            turtle.forward()
                            turtle.turnRight()
                        else
                            turtle.turnLeft()
                            turtle.dig()
                            turtle.forward()
                            turtle.turnLeft()
                        end
                    end
                end
                if d < depth then
                    turtle.digDown()
                    turtle.down()
                    turtle.turnRight()
                    turtle.turnRight()
                end
            end
            print("Excavation completed")
        else
            print("Invalid parameters for excavation")
        end
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