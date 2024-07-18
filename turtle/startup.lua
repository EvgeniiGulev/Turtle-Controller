---@diagnostic disable: undefined-global, undefined-field
local ws, err = http.websocket("ws://213.7.84.119:43509")
 
if not ws then
    print("Failed to connect to WebSocket server:", err)
    return
end
 
print("Connected to WebSocket server")

local homeCoords = nil
local turtle_id = 0;
local active_id = 0;
 
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
---
 
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

-- Function to edit floppy disk data
function populateDisk()
    if not fs.isDir('/disk') then
        error('Disk not inserted')
    end
    local file_contents = fs.open('startup', 'r').readAll()
    s = 'FILE_CONTENTS = [===[' .. file_contents .. ']' .. '===]'
    s = s .. [[
    file = fs.open('/startup', 'w')
    file.write(FILE_CONTENTS)
    file.close()
    shell.run('startup')
    ]]
    file = fs.open('/disk/startup', 'w')
    file.write(s)
    file.close()
end

function getMinionName()
    local minionNames = {
        "Kevin", "Stuart", "Bob", "Dave", "Jerry", "Carl", "Phil", "Tom",
        "Tim", "Mark", "Jorge", "Donny", "John", "Paul", "Lance", "Mike",
        "Ken", "Chris", "Steve", "Eric", "Larry", "Barry", "Jim", "Mitch",
        "Sam", "Otto", "Norbert", "Frank", "Gordon", "Oscar", "Pete",
        "Fred", "Eddie", "Hank", "Jack", "Leon", "Max", "Nick", "Ron",
        "Scott", "Victor", "Walter", "Xander", "Yves", "Zack", "Andy",
        "Benny", "Charlie", "Derek", "Elmer", "Floyd", "George", "Harry",
        "Iggy", "Jake", "Kyle", "Luke", "Manny", "Nate", "Ollie", "Quinn",
        "Randy", "Sammy", "Toby", "Ulysses", "Vinny", "Wes", "Xavier",
        "Yuri", "Zane"
    }
    local randomIndex = math.random(1, #minionNames)
    return minionNames[randomIndex]
end

-- Function to set Turtle Name
function setTurtleName()
    local name = getMinionName();
    if not os.getComputerLabel() then
        os.setComputerLabel(name)
        return name
    end
    return os.getComputerLabel()
end

-- Function to get turtle #id
function getTurtleID()
    local id = os.getComputerID()
    return id;
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
        if turtle then
            turtle.craft()
        else
            print("Turtle is nil, cannot craft.")
        end
    elseif message == "getFuel" then
        local fuelLevel = turtle.getFuelLevel()
        ws.send(fuelLevel)
    elseif message == "update" then
        updateInventory()
    elseif message == "stop" then
        -- Stop execution
        return
    elseif message == "editDisk" then
        populateDisk()
    elseif message == "setHome" then
        setHome()
    elseif message == "return" then
        returnHome()
    elseif message == "shutdown" then
        os.shutdown()
        elseif string.sub(message, 1, 10) == "transferTo" then
        local params = { string.match(message, "transferTo (%d+) (%d+)") }
        local targetIndex = tonumber(params[1])
        local count = tonumber(params[2])
        turtle.transferTo(targetIndex, count)
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
            turtle.digDown()
            turtle.down()
            for d = 1, depth do
                for w = 1, width do
                    for l = 1, length - 1 do
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
        elseif string.sub(message, 1, 6) == "tunnel" then
        local params = { string.match(message, "tunnel (%d+) (%d+) (%d+)") }
        local height = tonumber(params[1])
        local width = tonumber(params[2])
        local depth = tonumber(params[3])
        if height and width and depth then
            turtle.dig()
            turtle.forward()
            print("Tunneling completed")
        else
            print("Invalid parameters for excavation")
        end
    end
end

local function turtleInit(name, turtle_id)
    ws.send(name.." "..turtle_id)
end

-- Function to check and update the active ID
local function checkID(message)
    if string.sub(message, 1, 11) == "setActiveID" then
        local id = string.match(message, "setActiveID (%d+)")
        id = tonumber(id)

        if id then
            print("The Turtle ID is: " .. id)
            active_id = id
        else
            print("No valid ID found in message")
        end
    end
end

local function turtleStartup()
    local name = setTurtleName()
    turtle_id = getTurtleID()
    turtleInit(name, turtle_id)

    local fuelLevel = turtle.getFuelLevel()
    if fuelLevel == 0 then
        print("Please Provide Fuel!")
    end
--[[     -- Send a message to the WebSocket server
    ws.send("Hello from "..name.." #"..turtle_id) ]]
    while true do
        local message = ws.receive()
        checkID(message)
        if turtle_id == active_id then
            if message then
                handleMessage(message)
            end
        end
    end
end
 
-- Main loop to listen for messages
turtleStartup()

-- Close the WebSocket connection when done
ws.close()