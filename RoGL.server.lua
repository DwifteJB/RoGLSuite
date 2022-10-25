--[[
		RoGL Server
		Created by Dwifte (RobsPlayz)
]]

local Host = "x"
local Key = "x"

local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")

coroutine.wrap(function()
	while task.wait(3) do
		local Data = {}
		Data.Key = Key
		Data.Players = {}
		for _,Player in Players:GetPlayers() do
			if not Player:FindFirstChild("Character") then return end
			if not Player.Character:FindFirstChild("HumanoidRootPart") then return end
			local PlayerHRP = Player.Character.HumanoidRootPart
			Data.Players[Player.UserId] = {
				["Position"]={
					["X"]=PlayerHRP.Position.X,
					["Y"]=PlayerHRP.Position.Y,
					["Z"]=PlayerHRP.Position.Z
				},
				["Rotation"]={
					["X"]=PlayerHRP.Position.X,
					["Y"]=PlayerHRP.Position.Y,
					["Z"]=PlayerHRP.Position.Z
				},
				["PlayerName"]=Player.Name
			}
			HttpService:PostAsync(Host.."/api/SendPlayerPositions", HttpService:JSONEncode(Data))
		end
	end
end)()