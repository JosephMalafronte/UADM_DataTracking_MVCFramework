using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AutomatedTellerMachine.Controllers
{
    public class HomeController : Controller
    {
        // GET /home/index
        public ActionResult Index()
        {

            ViewBag.ClassName = "";

            return View();
        }

        [HttpPost]
        public ActionResult Index(string className)
        {
            ViewBag.ClassName = className;

            return View();
        }

        public ActionResult GPACalculator()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.TheMessage = "Having Trouble? Send us a message!";

            return View();
        }

        [HttpPost]
        public ActionResult Contact(string message)
        {
            ViewBag.TheMessage = message;

            return View();
        }

        public ActionResult Foo()
        {
            return View("About");
        }

        public ActionResult Serial(string letterCase)
        {
            var serial = "ASPNETMVC5ATM1";
            if(letterCase == "lower")
            {
               return Content(serial.ToLower());
            }
            return new HttpStatusCodeResult(403);
        }

    }
}