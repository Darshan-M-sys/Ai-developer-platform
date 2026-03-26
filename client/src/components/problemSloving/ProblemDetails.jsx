import React from "react";

const ProblemDetails = () => {
  return (
    <div className="p-4 space-y-4">

      <h1 className="text-xl font-bold">Two Sum</h1>

      <p>
        Given an array of integers nums and an integer target, return indices 
        of the two numbers such that they add up to target.
      </p>

      <div>
        <h2 className="font-semibold">Input:</h2>
        <p>nums = [2,7,11,15], target = 9</p>
      </div>

      <div>
        <h2 className="font-semibold">Output:</h2>
        <p>[0,1]</p>
      </div>

      <div>
        <h2 className="font-semibold">Constraints:</h2>
        <ul className="list-disc ml-6">
          <li>2 ≤ nums.length ≤ 10⁴</li>
          <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
        </ul>
      </div>

    </div>
  );
};

export default ProblemDetails;